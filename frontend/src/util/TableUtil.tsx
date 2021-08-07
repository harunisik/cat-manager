import { Col, Row, Spinner } from 'react-bootstrap';

export const SpinnerRow = () => {
  return (
    <Row>
      <Col>
        <Spinner size="sm" animation="border" className="mr-1" />
        Data Loding...
      </Col>
    </Row>
  );
};

export const NoDataRow = () => {
  return (
    <Row>
      <Col>
        <i className="fas fa-database mr-1" />
        No Data.
      </Col>
    </Row>
  );
};
