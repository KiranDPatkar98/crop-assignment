import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Spinner } from 'react-bootstrap';
import './dashboard.css';

const Dashboard = () => {
  const [records, setRecords] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        'https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json'
      );
      setRecords(res.data.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  console.log(records, 'iam records');

  //   return <div>{isLoading && <Spinner animation="border" />}</div>;

  return (
    <Container>
      <Row className="mt-5">
        {isLoading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          records.length > 0 &&
          records?.map((value) => (
            <Col key={value.id} xs={12} md={6} lg={4}>
              <Card className="tile" onClick={() => {}}>
                <Card.Img
                  style={{ height: '50%' }}
                  variant="top"
                  src={value.thumbnails[0].image}
                />
                <Card.Body>
                  <Card.Title>{value?.crop_name}</Card.Title>
                  {/* <Card.Text>
                    Offering life by donating blood, a compassionate act
                    fostering hope and saving lives
                  </Card.Text> */}
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
