export class CartItem {
    public constructor(
        public productId?: number,
        public productName?: string,
        public productPrice?: number,
        public productDescription?: string,
        //productImage?: img
        public quantity?: number,
        public totalPice?:number,

    ) { }

}
