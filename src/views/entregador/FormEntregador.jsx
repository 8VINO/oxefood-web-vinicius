import InputMask from 'comigo-tech-react-input-mask/lib/react-input-mask.development';
import { Button, Container, Divider, Form, Icon, Dropdown } from 'semantic-ui-react';
import { useState } from 'react';
export default function FormEntregador() {
    const options = [
        { key: 'br', text: 'PE', value: 'br' },
        { key: 'sp', text: 'SP', value: 'sp' },
        { key: 'rj', text: 'RJ', value: 'rj' },
    ];
    return (

        <div style={{ marginTop: '3%' }}>
            <Container textAlign='justified'>
                <h2><span style={{ color: 'darkgray' }}>Entregador &nbsp;<Icon name='angle double right' size='small' /> </span>Entregador </h2>

                <Divider />
                <div style={{ marginTop: '4%' }}>

                    <Form >
                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Nome'
                                required
                                maxLength='100' />

                            <Form.Input
                                fluid
                                label='CPF'
                                required
                            >
                                <InputMask
                                    mask='999.999.999-99'
                                />
                            </Form.Input>
                            <Form.Input
                                fluid
                                label='RG'
                                required
                            >
                                <InputMask
                                    mask='99.999.999'
                                />
                            </Form.Input>

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='DT Nascimento'
                                required
                                placeholder='Ex: 20/03/1985'
                            >
                                <InputMask
                                    mask="99/99/9999"
                                    maskChar={null}
                                    placeholder="Ex: 20/03/1985"
                                />
                            </Form.Input>

                            <Form.Input
                                fluid
                                label='Fone Celular'
                                required>
                                <InputMask
                                    mask="(99) 9999-9999"
                                />
                            </Form.Input>
                            <Form.Input
                                fluid
                                label='Fone Fixo'>
                                <InputMask
                                    mask="(99) 9999.9999"
                                />
                            </Form.Input>
                            <Form.Input
                                fluid
                                label='RG'
                                required
                            >
                                <InputMask
                                    mask='99.999.999'
                                />
                            </Form.Input>
                            <Form.Input
                                fluid
                                label='QTD Entregas Realizadas'
                                type='number'
                            >

                            </Form.Input>
                            <Form.Input
                                fluid
                                label='Valor Por Frete'
                                type='number'
                            >

                            </Form.Input>

                        </Form.Group>

                        <Form.Group widths='equal'>
                            <Form.Input
                                fluid
                                label='Rua'

                            />
                            <Form.Input
                                fluid
                                label='Número'
                                placeholder='30'
                                type='number'
                            />

                        </Form.Group>
                        <Form.Group>
                            <Form.Input
                                fluid
                                label='Bairro'

                            />
                            <Form.Input
                                fluid
                                label='Cidade'
                                placeholder='30'

                            />
                            <Form.Input
                                fluid
                                label='CEP'
                                type='number'
                            />
                        </Form.Group>
                        <Form.Field>
                            <label>UF</label>
                            <Dropdown
                                placeholder='Selecione'
                                fluid
                                selection
                                options={options}
                                
                               
                            />
                        </Form.Field>
                        <Form.Input
                                fluid
                                label='Complemento'

                            />
                        <Form.Group>
                            <label style={{ fontWeight: 'bold' }}>Ativo:</label>  
                            <Form.Radio label="Sim" value="y" defaultChecked />
                            <Form.Radio label="Não" value="n" defaultChecked />
                        </Form.Group>  



                    </Form>
                    <div style={{ marginTop: '4%' }}>
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

    );
}