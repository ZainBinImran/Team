import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFilter, FaSearch } from 'react-icons/fa';
import api from '../services/api';

function Tournaments() {
  const [tournaments, setTournaments] = useState([]);
  const [filteredTournaments, setFilteredTournaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    api.getTournaments().then(data => {
      setTournaments(data);
      setFilteredTournaments(data);
    });
  }, []);

  useEffect(() => {
    let filtered = tournaments;
    
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.year.toString().includes(searchTerm) ||
        t.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.tournament_type === filterType);
    }
    
    setFilteredTournaments(filtered);
  }, [searchTerm, filterType, tournaments]);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="display-5 fw-bold text-primary">Tournaments</h1>
          <p className="lead">Browse through Pakistan's performance in major tournaments</p>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={6}>
          <div className="input-group">
            <span className="input-group-text">
              <FaSearch />
            </span>
            <Form.Control
              type="text"
              placeholder="Search tournaments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </Col>
        <Col md={6}>
          <div className="d-flex align-items-center">
            <FaFilter className="me-2" />
            <Form.Select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              style={{ maxWidth: '200px' }}
            >
              <option value="all">All Tournaments</option>
              <option value="WC">World Cup</option>
              <option value="CT">Champions Trophy</option>
              <option value="AC">Asia Cup</option>
              <option value="T20">T20 World Cup</option>
            </Form.Select>
          </div>
        </Col>
      </Row>

      {/* Tournament Cards */}
      <Row>
        {filteredTournaments.map(tournament => (
          <Col key={tournament.id} md={4} className="mb-4">
            <Card className="h-100 shadow">
              <Card.Img 
                variant="top" 
                src={tournament.image_url}
                height="200"
                style={{ objectFit: 'cover' }}
              />
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <div>
                    <Card.Title className="h5 mb-1">
                      {tournament.name} {tournament.year}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {tournament.location}
                    </Card.Subtitle>
                  </div>
                  <span className={`badge ${
                    tournament.tournament_type === 'WC' ? 'bg-danger' :
                    tournament.tournament_type === 'CT' ? 'bg-success' :
                    tournament.tournament_type === 'AC' ? 'bg-info' : 'bg-warning'
                  }`}>
                    {tournament.get_tournament_type_display}
                  </span>
                </div>
                
                <Card.Text className="mb-3">
                  <strong>Captain:</strong> {tournament.captain}<br />
                  <strong>Coach:</strong> {tournament.coach}<br />
                  <strong>Result:</strong> {tournament.result}
                </Card.Text>
                
                <div className="d-grid">
                  <Button 
                    as={Link} 
                    to={`/tournaments/${tournament.id}`}
                    variant="primary"
                  >
                    View Full Squad & Details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {filteredTournaments.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <h3 className="text-muted">No tournaments found</h3>
            <p>Try adjusting your search or filter</p>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default Tournaments;