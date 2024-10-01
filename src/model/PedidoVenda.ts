export class PedidoVenda {
    idPedido: number;
    idCarro: number;
    idCliente: number;
    dataPedido: Date;
    valorPedido: number;

    constructor(idPedido: number, idCarro: number, idCliente: number, dataPedido: Date, valorPedido: number) {
        this.idPedido = idPedido;
        this.idCarro = idCarro;
        this.idCliente = idCliente;
        this.dataPedido = dataPedido;
        this.valorPedido = valorPedido;
    }

    // Lista de Pedidos
    listagemPedidos(): Array<PedidoVenda> {
        // Lógica para listar pedidos
        return [];
    }

    // Cadastra um novo pedido
    cadastroPedido(idCliente: number, idCarro: number, dataPedido: Date, valorPedido: number): boolean {
        // Lógica para cadastrar um novo pedido
        return true;
    }

    // Remove um pedido
    removerPedido(idPedido: number): boolean {
        // Lógica para remover um pedido
        return true;
    }

    // Atualiza um pedido existente
    atualizarPedido(idPedido: number, idCliente: number, idCarro: number, dataPedido: Date, valorPedido: number): boolean {
        // Lógica para atualizar um pedido
        return true;
    }
}