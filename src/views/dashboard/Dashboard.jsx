import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Modal, InputGroup, FormControl } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import './dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedImageUrl, setSelectedImageUrl] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const perPage = 10;
  const fetchRecords = async () => {
    try {
      const res = await axios.get(
        'https://api-cache-test.leanagri.com/pop/pop_list/en/64/pop_list.json'
      );
      setRecords(res.data.data);
    } finally {
    }
  };

  const filteredRecords = records.filter((record) => {
    return record.crop_name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const pageCount = Math.ceil(filteredRecords.length / perPage);
  const offset = currentPage * perPage;
  const currentRecords = filteredRecords.slice(offset, offset + perPage);

  useEffect(() => {
    fetchRecords();
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery]);

  const handleClose = () => {
    setSelectedImageUrl('');
  };

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col className="text-end mb-2">
          <Button variant="outline-danger" onClick={() => navigate('/login')}>
            Logout
          </Button>
        </Col>
      </Row>
      <Modal show={selectedImageUrl} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body className="text-center">
          <img src={selectedImageUrl} alt="crop"></img>
        </Modal.Body>
      </Modal>
      <Row className="mt-5">
        <Col xs={12}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search by crop name"
              aria-label="Search"
              aria-describedby="basic-addon1"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </Col>
      </Row>
      {filteredRecords.length > 10 && (
        <div className="text-center">
          <ReactPaginate
            previousLabel={'Previous'}
            nextLabel={'Next'}
            breakLabel={'...'}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            previousLinkClassName={'previous'}
            nextLinkClassName={'next'}
            disabledClassName={'disabled'}
          />
        </div>
      )}
      <Row>
        {currentRecords.length > 0 ? (
          currentRecords?.map((value) => (
            <Col className="mb-5" key={value.id} xs={12} md={6} lg={4}>
              <Card
                className="tile"
                onClick={() => {
                  setSelectedImageUrl(value.thumbnails[0].image);
                }}
              >
                <Card.Img
                  className="p-5"
                  style={{ height: '80%' }}
                  variant="top"
                  src={value.thumbnails[0].image}
                />
                <Card.Body className="text-center">
                  <Card.Title>{value?.crop_name}</Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col className="mb-5" xs={12} md={6} lg={4}>
            <p>No matching records found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;
