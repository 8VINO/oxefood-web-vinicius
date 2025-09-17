import { Button, Container, Divider, Form, Icon } from 'semantic-ui-react';

export default function FormProduto(){
    return(
        
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
                            maxLength='100'/>

                            <Form.Input
                            fluid
                            label='Código do produto'
                            required
                            placeholder='Informe o código do produto'
                            type='number'
                            />
                            


                            
                        </Form.Group>
                        <Form.TextArea
                            label='Descrição'
                            fluid
                            placeholder='Informe a descrição do produto'>
                        </Form.TextArea>
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Valor Unitário'
                                required
                                type='number'
                            />
                            <Form.Input
                                fluid
                                label='Tempo de Entrega Mínimo em Minutos'
                                placeholder='30'
                                type='number'                           
                            />
                            <Form.Input
                                fluid
                                label='Tempo de Entrega Máximo em Minutos'
                                placeholder='40'
                                type='number'                           
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
                        floated='right' >
                            <Icon
                            name='save'
                            />
                            Salvar

                        </Button>
                    </div>
               
                </div>
                
            </Container>
        </div>
    )
}