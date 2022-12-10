import React from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import "../assets/css/error-page.scss";

const ErrorPage = (props) => {
  const path = props.location.pathname === "/search";

  return (
    !path && (
      <div className="error-page">
        <Container>
          <Row className="justify-content-center">
            <Col xs="12">
              <div className="error-page-img">
                <img
                  src={
                    "https://demo.themesberg.com/volt-react-dashboard/static/media/404.85064a97.svg"
                  }
                  alt="error-img"
                />
              </div>
              <h1>Page not found</h1>
              <p>
                Oops! Looks like you followed a bad link. If you think this is a
                problem with us, please tell us.
              </p>
              <div className="error-page-btn-div">
                {sessionStorage.getItem("username") === null ? (
                  <Button
                    variant="primary"
                    onClick={() =>
                      props.history.push({
                        pathname: "/search",
                      })
                    }
                  >
                    Login
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={() =>
                      props.history.push({
                        pathname: "/login",
                      })
                    }
                  >
                    Go back home
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  );
};

export default ErrorPage;
