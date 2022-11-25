import React from 'react';
import { Col} from "react-bootstrap";
import { request } from '../helper/helper';
import Card from 'react-bootstrap/Card';

import './cards.css'

import image1 from '../../assets/1.jpg';
import image2 from '../../assets/2.jpg';
import image3 from '../../assets/3.jpg';
import image4 from '../../assets/4.jpg';
import image5 from '../../assets/5.jpg';
import image6 from '../../assets/6.jpg';
import image7 from '../../assets/7.jpg';
import image8 from '../../assets/8.jpg';

const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8
  ];
export default class CardsR extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            Loading: false,
            rows: [],

        };
       
    }

    componentDidMount() {
        this.getData();
        this.changeImage();
    }
    getData() {
        this.setState({ loading: true });
        request
            .get(this.props.url)
            .then((response) => {
                this.setState({
                    rows: response.data,
                    loading: false,
                });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });

    }


    changeImage = () => {
        const randomNumber = Math.floor(Math.random() * 7);
        this.setState({
          currentImageIndex: randomNumber
        });
      }
    
    render() {
        return (
            this.state.rows
                .map(items =>
                    <Col className='content ms-2 me-2 mb-2 cards-re'>
                             
                            <Card className='max-card'>
                                <Card.Img  src={images[Math.floor(Math.random() * 7)]} alt="Card image" className='cardImage' />
                                <Card.Body>
                                    <Card.Title>{items.nombre}</Card.Title>
                                    <Card.Text>
                                        Cantidad: {items.cantidad}
                                        <br></br>
                                        Precio: {items.precio}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                
                    </Col>

                )
        );
    }
}
