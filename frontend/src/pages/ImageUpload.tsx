import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useHistory } from 'react-router';
import { uploadImage } from '../api/ImageApi';
import { Col, Container, Row, Alert } from 'react-bootstrap';
import ImageUploadForm from '../components/ImageUploadForm';
import { toast } from 'react-toastify';
import { FormSubmitStatus } from '../util/PageUtils';
import ModalComp from '../components/Modal';

function ImageUpload() {
  const [file, setFile] = useState<File>();
  const [formSubmitStatus, setFormSubmitStatus] = useState(FormSubmitStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { files } = target;
    if (!files) return;
    setFile(files[0]);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    setFormSubmitStatus(FormSubmitStatus.VALIDATED);

    const form = event.currentTarget;

    if (form.checkValidity()) {
      setFormSubmitStatus(FormSubmitStatus.CONFIRM);
    }
  };

  const handleModalOnSave = () => {
    if (!file) return;
    setFormSubmitStatus(FormSubmitStatus.SUBMITTING);

    uploadImage(file)
      .then(() => {
        processSuccessResponse();
      })
      .catch((error) => {
        setFormSubmitStatus(FormSubmitStatus.FAILED);
        setErrorMessage(error.message);
      });
  };

  const processSuccessResponse = () => {
    toast.info('Cat uploaded successfully.', { position: 'bottom-right' });
    history.push('/');
  };

  const isFailed = () => {
    return formSubmitStatus === FormSubmitStatus.FAILED;
  };

  return (
    <>
      <ModalComp
        show={formSubmitStatus === FormSubmitStatus.CONFIRM}
        onHide={() => setFormSubmitStatus(FormSubmitStatus.VALIDATED)}
        onSave={handleModalOnSave}
      />
      <Container fluid>
        <Row>
          <Col>
            <h3>New Cat</h3>
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
            </Alert>
          </Col>
        </Row>
        <Row>
          <Col>
            <ImageUploadForm
              formSubmitStatus={formSubmitStatus}
              onFileChange={handleFileChange}
              onSubmit={handleFormSubmit}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ImageUpload;
