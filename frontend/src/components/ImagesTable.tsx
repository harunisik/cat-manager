import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { ImageData } from '../api/ImageApi';
import { LoadStatus } from '../util/PageUtils';
import { NoDataRow, SpinnerRow } from '../util/TableUtil';

interface Props {
  status: LoadStatus;
  imageList: ImageData[];
  handleFavouriteClick: (id: string, favouriteId?: string) => void;
  handleVoteClick: (id: string, value: number) => void;
}

const ImagesTable = ({ imageList, status, handleFavouriteClick, handleVoteClick }: Props) => {
  return (
    <Container>
      {status === LoadStatus.LOADING ? (
        <SpinnerRow />
      ) : !imageList || imageList.length === 0 ? (
        <NoDataRow />
      ) : (
        <Row className="align-items-center">
          {imageList.map((image, index: number) => {
            return (
              <Col key={image.id}>
                <Container>
                  <Row>
                    <Col className="text-center">
                      <Image width="200px" src={image.url} />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-right">
                      <i
                        className={image.value === 1 ? 'fas fa-thumbs-up' : 'far fa-thumbs-up'}
                        aria-hidden="true"
                        onClick={() => handleVoteClick(image.id, 1)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Col>
                    <Col>
                      <i
                        className={image.value === 0 ? 'fas fa-thumbs-down' : 'far fa-thumbs-down'}
                        aria-hidden="true"
                        onClick={() => handleVoteClick(image.id, 0)}
                        style={{ cursor: 'pointer' }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Button
                        variant="outline-success"
                        onClick={() => handleFavouriteClick(image.id, image.favouriteId)}>
                        <i
                          className={image.favouriteId ? 'fas fa-heart mr-2' : 'far fa-heart mr-2'}
                          aria-hidden="true"
                        />
                        {image.favouriteId ? 'Remove' : 'Add'} Favourite
                      </Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <p>Score: {image.value}</p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
};

export default ImagesTable;
