import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { ChangeEventHandler, FormEventHandler } from 'react';
import { FormSubmitStatus } from '../util/PageUtils';

interface Props {
  formSubmitStatus: FormSubmitStatus;
  onFileChange: ChangeEventHandler<HTMLInputElement>;
  onSubmit: FormEventHandler<HTMLFormElement>;
}

function ImageUploadForm({ formSubmitStatus, onFileChange, onSubmit }: Props) {
  return (
    <Form
      noValidate
      validated={formSubmitStatus !== FormSubmitStatus.IDLE}
      onSubmit={onSubmit}
      data-testid="imageUploadForm">
      <Form.Group as={Row}>
        <Form.Label column sm={3}>
          File:
        </Form.Label>
        <Col sm={4}>
          <Form.Control
            accept="image/*"
            id="file"
            name="file"
            type="file"
            multiple={false}
            onChange={onFileChange}
            required
          />
          <Form.Control.Feedback type="invalid" className="text-left">
            Please provide a valid file.
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3">
        <Col sm={{ span: 2, offset: 3 }}>
          <Button
            className="btn-block"
            variant="primary"
            size="sm"
            type="submit"
            disabled={formSubmitStatus === FormSubmitStatus.SUBMITTING}>
            {formSubmitStatus === FormSubmitStatus.SUBMITTING && (
              <Spinner size="sm" animation="border" className="mr-1" />
            )}
            <i className="fas fa-save mr-2" aria-hidden="true" />
            Save
          </Button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default ImageUploadForm;
