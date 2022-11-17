import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { request } from "../helper/helper";

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone, SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import './empleados.css';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
const { SearchBar } = Search;

const products = [
  {
    id: 1,
    name: "Producto 1",
    price: 1000,
  },
  {
    id: 2,
    name: "Producto 2",
    price: 2000,
  },
  {
    id: 3,
    name: "Producto 3",
    price: 3000,
  },
  {
    id: 4,
    name: "Producto 4",
    price: 4000,
  },
  {
    id: 5,
    name: "Producto 5",
    price: 5000,
  },
  {
    id: 6,
    name: "Producto 6",
    price: 1000,
  },
  {
    id: 7,
    name: "Producto 7",
    price: 1000,
  },
  {
    id: 8,
    name: "Producto 8",
    price: 2000,
  },
  {
    id: 9,
    name: "Producto 9",
    price: 3000,
  },
  {
    id: 10,
    name: "Producto 10",
    price: 4000,
  },
  {
    id: 11,
    name: "Producto 11",
    price: 5000,
  },
  {
    id: 12,
    name: "Producto 12",
    price: 1000,
  }
];
const columns = [{
  dataField: 'id',
  text: 'Product ID'
}, {
  dataField: 'name',
  text: 'Product Name'
}, {
  dataField: 'price',
  text: 'Product Price'
}];

export default class EmpleadosBuscar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    request
      .get("/empleados")
      .then(response => {
        console.log(response.data);
      }
      )
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    const options = {
      custom: true,
      totalSize: products.length
    };
    return <Container id="empleado-buscar-container">
      <Row>
        <h1>Buscar Empleados</h1>
      </Row>
      <Row>
        <ToolkitProvider
          keyField="id"
          data={products}
          columns={columns}
          search>
          {props => (
            <div>
              <h3>Input something at below input field:</h3>
              <hr />
              <PaginationProvider
                pagination={paginationFactory(options)}>
                {
                  ({
                    paginationProps,
                    paginationTableProps
                  }) => (
                    <div>
                      <Row>
                        <Col>
                          <SizePerPageDropdownStandalone
                            {...paginationProps} />
                        </Col>
                        <Col>
                          <SearchBar {...props.searchProps} />
                        </Col>
                      </Row>
                      <BootstrapTable
                        keyField="id"
                        data={products}
                        columns={columns}
                        {...paginationTableProps}
                        {...props.baseProps}
                      />
                      <PaginationListStandalone
                        {...paginationProps}
                      />
                    </div>
                  )
                }
              </PaginationProvider>
            </div>
          )
          }
        </ToolkitProvider>
      </Row>
    </Container>;
  }
}