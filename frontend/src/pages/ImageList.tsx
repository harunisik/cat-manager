import { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Alert } from 'react-bootstrap';
import { useHistory } from 'react-router';
import ImagesTable from '../components/ImagesTable';
import { LoadStatus } from '../util/PageUtils';
import axios from 'axios';
import API from '../api/ApiUtils';
import { favouriteImage, ImageData, unfavouriteImage, voteImage } from '../api/ImageApi';

function ImageList() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [tableStatus, setTableStatus] = useState(LoadStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  useEffect(() => {
    loadImagesData();
  }, []);

  const loadImagesData = () => {
    setTableStatus(LoadStatus.LOADING);

    const requestList = [API.get('/images?limit=100&page=0'), API.get('/favourites'), API.get('/votes')];

    axios
      .all(requestList)
      .then(
        axios.spread((...responses) => {
          setTableStatus(LoadStatus.IDLE);

          const images = responses[0].data;
          const favourites = responses[1].data;
          const votes = responses[2].data;

          const countVotes = (arr: any, id: string, value: number) =>
            arr.reduce((a: any, v: any) => (v.image_id === id && v.value === value ? a + 1 : a), 0);

          const imageList: any = [];
          images.forEach((responseImage: any) => {
            const image: ImageData = {
              id: responseImage.id,
              url: responseImage.url,
              value: 0,
              favouriteId: undefined,
            };

            const favourite = favourites.find((item: any) => item.image_id === image.id);
            if (favourite) {
              image.favouriteId = favourite.id;
            }

            image.value = countVotes(votes, image.id, 1) - countVotes(votes, image.id, 0);

            imageList.push(image);
          });

          setImages(imageList);
        })
      )
      .catch((errors) => {
        setTableStatus(LoadStatus.FAILED);
        setErrorMessage(errors[0].message);
      });
  };

  const handleVoteClick = (id: string, value: number) => {
    const requestData = {
      image_id: id,
      value,
    };

    voteImage(requestData)
      .then(() => {
        setImages((previousData) => {
          const image = previousData.find((item) => item.id === id);
          if (image) {
            image.value = value === 1 ? image.value + 1 : image.value - 1;
          }
          return [...previousData];
        });
      })
      .catch((error) => {
        setTableStatus(LoadStatus.FAILED);
        setErrorMessage(error.message);
      });
  };

  const handleFavouriteClick = (id: string, favouriteId?: string) => {
    if (favouriteId) {
      unfavouriteImage(favouriteId)
        .then(() => {
          setImages((previousData) => {
            const image = previousData.find((item) => item.id === id);
            if (image) {
              image.favouriteId = undefined;
            }
            return [...previousData];
          });
        })
        .catch((error) => {
          setTableStatus(LoadStatus.FAILED);
          setErrorMessage(error.message);
        });
    } else {
      const requestData = {
        image_id: id,
      };

      favouriteImage(requestData)
        .then((data) => {
          setImages((previousData) => {
            const image = previousData.find((item) => item.id === id);
            if (image) {
              image.favouriteId = data.id;
            }
            return [...previousData];
          });
        })
        .catch((error) => {
          setTableStatus(LoadStatus.FAILED);
          setErrorMessage(error.message);
        });
    }
  };

  const isFailed = () => {
    return tableStatus === LoadStatus.FAILED;
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h3>Cats</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="line" />
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="danger" show={isFailed()} transition={false}>
            <i className="fas fa-exclamation-triangle mr-1" aria-hidden="true" />
            {errorMessage}
            <Alert.Link variant="link" onClick={loadImagesData} className="ml-1">
              Refresh table.
            </Alert.Link>
          </Alert>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col className="text-right">
          <Button variant="outline-info" size="sm" onClick={() => history.push('/upload')}>
            <i className="fas fa-plus fa-fw" aria-hidden="true" />
            Add Cat
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <ImagesTable
            imageList={images}
            status={tableStatus}
            handleFavouriteClick={handleFavouriteClick}
            handleVoteClick={handleVoteClick}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default ImageList;
