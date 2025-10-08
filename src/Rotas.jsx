import { Route, Routes } from "react-router-dom";

import FormCliente from './views/cliente/FormCliente';
import ListCliente from './views/cliente/ListCliente';
import Home from './views/home/Home';
import FormProduto from './views/produto/FormProduto';
import ListProduto from './views/produto/ListProduto';
import FormEntregador from './views/entregador/FormEntregador';
import ListEntregador from './views/entregador/ListEntregador';
import FormCategoriaProduto from "./views/categoriaProduto/FormCategoriaProduto";
import ListCatgoriaProduto from "./views/categoriaProduto/ListCategoriaProduto";
import FormEnderecoCliente from "./views/enderecoCliente/FormEnderecoCliente";
import ListEnderecoCliente from "./views/enderecoCliente/ListEnderecoCliente";
import FormCidade from "./views/cidade/FormCidade";
import ListCidade from "./views/cidade/ListCidade";

function Rotas() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="list-cliente" element={ <ListCliente/> } />
                <Route path="form-cliente" element={ <FormCliente/> } />
                <Route path="form-endereco-cliente" element={ <FormEnderecoCliente/> } />
                <Route path="list-endereco-cliente" element={ <ListEnderecoCliente/> } />
                <Route path="form-produto" element={ <FormProduto/> } />
                <Route path="list-produto" element={ <ListProduto/> } />
                <Route path="form-categoria" element={ <FormCategoriaProduto/> } />
                <Route path="list-categoria" element={ <ListCatgoriaProduto/> } />
                <Route path="form-entregador" element={ <FormEntregador/> } />
                <Route path="list-entregador" element={ <ListEntregador/> } />

                <Route path="form-cidade" element={ <FormCidade/> } />
                <Route path="list-cidade" element={ <ListCidade/> } />

            </Routes>
        </>
    )
}

export default Rotas
