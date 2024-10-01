export class Cliente {
    idCliente: number;
    nome: string;
    cpf: string;
    telefone: string;

    constructor(idCliente: number, nome: string, cpf: string, telefone: string) {
        this.idCliente = idCliente;
        this.nome = nome;
        this.cpf = cpf;
        this.telefone = telefone;
    }

    // Lista de Clientes
    listagemClientes(): Array<Cliente> {
        // Lógica para listar clientes
        return [];
    }

    // Cadastra um novo cliente
    cadastroCliente(cliente: Cliente): boolean {
        // Lógica para cadastrar um novo cliente
        return true;
    }

    // Remove um cliente
    removerCliente(idCliente: number): boolean {
        // Lógica para remover um cliente
        return true;
    }

    // Atualiza um cliente existente
    atualizarCliente(cliente: Cliente): boolean {
        // Lógica para atualizar um cliente
        return true;
    }
}