import React from "react";
import { Container, Row } from "react-bootstrap";
import '../productos.css';
import DataGrid from "../../grid/grid";


const columns = [{
  dataField: '_id',
  text: 'ID',
  hidden: true,
}, {
  dataField: 'nombre',
  text: 'Nombre'
}, {
  dataField: 'precio',
  text: 'Precio'
}, {
  dataField: 'cantidad',
  text: 'Cantidad'
}];


export default class ProductosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {

  }
  render() {

    return (
      <Container id="producto-buscar-container">
        <Row>
          <h1>Buscar Productos</h1>
        </Row>
        <Row>
          <DataGrid url="/productos" columns={columns} />
        </Row>
      </Container>
    );
  }
}