import axios from 'axios';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
export default function FormCategoriaProduto() {
    const [descricao, setDescricao] = useState();
    const [idCategoriaProduto,setIdCategoriaProduto]=useState();
    const {state}= useLocation();

    useEffect(() => {
        if (state != null && state.id != null) {
            axios.get("http://localhost:8080/api/categoriaproduto/" + state.id)
                .then((response) => {
                    setIdCategoriaProduto(response.data.id)
                    setDescricao(response.data.descricao)
                })
        }
    }, [state])

    function salvar() {
        let categoriaProdutoRequest = {
            descricao: descricao,
        }
        if (idCategoriaProduto != null) {
            axios.put("http://localhost:8080/api/categoriaproduto/" + idCategoriaProduto, categoriaProdutoRequest)
                .then((response) => { console.log("Categoria de Produto atualizada com sucesso") })
                .catch((error) => { console.log("Erro ao atualizar Categoria de Produto", error.response ? error.response.value : error) })
        } else {
            axios.post("http://localhost:8080/api/categoriaproduto", categoriaProdutoRequest)
                .then((response) => { console.log("Categoria de Produto cadastrada com sucesso") })
                .catch((error) => { console.log("Erro ao cadastrar Categoria de Produto", error.response ? error.response.value : error) })
        }



    }
    return (
        <div>
            <MenuSistema tela={"categoria"}/>
            <div style={{ marginTop: '3%' }}>
                <Container textAlign="justified">
                    {idCategoriaProduto === undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria de Produto&nbsp;<Icon name='angle double right' size="small" /> </span> Cadastro</h2>
                    }
                    {idCategoriaProduto != undefined &&
                        <h2> <span style={{ color: 'darkgray' }}> Categoria de Produto&nbsp;<Icon name='angle double right' size="small" /> </span> Alteração</h2>
                    }
                    <Divider />
                    <div style={{ marginTop: '4%' }}>

                        <Form >
                            
                                <Form.Input
                                    fluid
                                    label='Descrição'
                                    required
                                    placeholder='Digite a descrição da categoria'
                                    value={descricao}
                                    onChange={(e,{value}) => setDescricao(value)} />


                        </Form>
                        <div style={{ marginTop: '4%' }}>
                            <Link to='/list-categoria'>
                                <Button
                                    type='button'
                                    inverted
                                    icon
                                    circular
                                    labelPosition='left'
                                    color='orange'

                                >
                                    <Icon name='reply' />
                                    Listar

                                </Button>
                            </Link>
                            <Button
                                type='button'
                                inverted
                                color='blue'
                                icon
                                circular
                                labelPosition='left'
                                floated='right'
                                onClick={() => salvar()}>
                                <Icon
                                    name='save'
                                />
                                Salvar

                            </Button>
                        </div>

                    </div>


                </Container>
            </div>


        </div>
    )
}