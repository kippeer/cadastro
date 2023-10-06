import React, { Component } from "react";
import Main from '../template/Main'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const headerProps = {
    icon: 'users',
    title: 'Usuários',
    subtitle: 'Cadastro de usuários: Incluir, Listar, Alterar e Excluir                                                                   Aperte f5 para atualizar os dados'
}

const baseUrl = 'https://backend-three-wine.vercel.app/users'
const initialState = {
    user: { name: '', email: '' },
    list: []
}

export default class UserCrud extends Component {
    state = { ...initialState }

    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        const config = {
            headers: {
                'Cache-Control': 'no-cache' // Adiciona o cabeçalho de controle de cache
            }
        };
        axios.get(baseUrl, config).then(resp => {
            this.setState({ list: resp.data })
        })
    }

    clear() {
        this.setState({ user: initialState.user })
    }

    save() {
        const user = this.state.user
        const method = user.id ? 'put' : 'post'
        const url = user.id ? `${baseUrl}/${user.id}` : baseUrl
        axios[method](url, user)
            .then(resp => {
                // Atualiza o estado local para refletir a mudança após salvar
                const updatedList = this.state.list.map(item => {
                    if (item.id === resp.data.id) {
                        return resp.data;
                    }
                    return item;
                });

                this.setState({
                    list: updatedList,
                    user: initialState.user
                });
            })
    }
    updateField(event) {
        const user = { ...this.state.user }
        user[event.target.name] = event.target.value
        this.setState({ user })
    }

    load(user) {
        this.setState({ user })
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            // Atualiza o estado local para refletir a mudança após excluir
            const updatedList = this.state.list.filter(item => item.id !== user.id);

            this.setState({
                list: updatedList
            });
        })
    }

    renderForm() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>Nome</label>
                            <input type="text"
                                className="form-control"
                                name="name"
                                value={this.state.user.name}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o nome..."
                            />
                        </div>
                    </div>

                    <div className="col-12 col-md-6">
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="text"
                                className="form-control"
                                name="email"
                                value={this.state.user.email}
                                onChange={e => this.updateField(e)}
                                placeholder="Digite o e-mail..."
                            />
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={() => this.save()}>
                            Salvar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={() => this.clear()}>
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderTable() {
        return (
            <table className="table mt-4">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(user => {
            return (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                        <button className="btn btn-warning" onClick={() => this.load(user)}>
                            <FontAwesomeIcon icon={faPencilAlt} />
                        </button>
                        <button className="btn btn-danger ml-2" onClick={() => this.remove(user)}>
                            <FontAwesomeIcon icon={faTrash} />
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Main {...headerProps}>
                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}
