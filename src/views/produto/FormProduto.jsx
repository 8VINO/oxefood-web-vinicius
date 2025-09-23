import axios from 'axios';
import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';
import MenuSistema from '../../MenuSistema';
import {useState} from 'react'
export default function FormProduto(){
    const [titulo,setTitulo]= useState();
    const [codigo,setCodigo]= useState();
    const [descricao,setDescricao]= useState();
    const [valorUnit,setValorUnit]= useState();
    const [tempMax,setTempMax]= useState();
    const [tempMin,setTempMin]= useState();

    function salvar(){
        let produtoRequest={
            titulo:titulo,
            codigo:codigo,
            descricao:descricao,
            valorUnitario:valorUnit,
            tempoEntregaMaximo:tempMax,
            tempoEntregaMinimo:tempMin
        }
            axios.post("http://localhost:8080/api/produto", produtoRequest)
                .then((response)=>{
                    console.log("Produto cadastrado com sucesso")
                })
                .catch((error)=>{
                      console.log("Erro ao cadastrar produto",error.response?error.response.value: error)  
                })
            


        
    }
    return(
    <div>
        <MenuSistema tela={"produto"}/>
        <div style={{marginTop:'3%'}}>
            <Container textAlign='justified'>

                <h2><span style={{color:'darkgray'}}>Produto &nbsp;<Icon name='angle double right' size='small'/> </span>Cadastro</h2>

                <Divider/>
                <div style={{marginTop:'4%'}}>

                    <Form >
                        <Form.Group widths='equal'>
                            <Form.Input
                            fluid
                            label='Título'
                            required
                            placeholder='Informe o título do produto'
                            maxLength='100'
                            value={titulo}
                            onChange={e=>setTitulo(e.target.value)}/>

                            <Form.Input
                            fluid
                            label='Código do produto'
                            required
                            placeholder='Informe o código do produto'
                            type='number'
                            value={codigo}
                            onChange={e=>setCodigo(e.target.value)}
                            />
                            


                            
                        </Form.Group>
                        <Form.TextArea
                            label='Descrição'
                            fluid
                            value={descricao}
                            placeholder='Informe a descrição do produto'
                            onChange={e=>setDescricao(e.target.value)}>

                        </Form.TextArea>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Valor Unitário'
                                required
                                type='number'
                                value={valorUnit}
                                onChange={e=>setValorUnit(e.target.value)}

                            />
                            <Form.Input
                                fluid
                                label='Tempo de Entrega Mínimo em Minutos'
                                placeholder='30'
                                type='number'
                                value={tempMin}
                                onChange={e=>setTempMin(e.target.value)}                           
                            />
                            <Form.Input
                                fluid
                                label='Tempo de Entrega Máximo em Minutos'
                                placeholder='40'
                                type='number' 
                                value={tempMax}
                                onChange={e=>setTempMax(e.target.value)}                          
                            />

                        </Form.Group>
                      
                    </Form>
                    <div style={{marginTop:'4%'}}>
                        <Button
                        type='button'
                        inverted
                        icon
                        circular
                        labelPosition='left'
                        color='orange'
                        >
                            <Icon name='reply'/>
                            Listar

                        </Button>

                        <Button
                        type='button'
                        inverted
                        color='blue' 
                        icon
                        circular
                        labelPosition='left'
                        floated='right' 
                        onClick={()=>salvar()}>
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