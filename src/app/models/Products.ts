export class Products {
    public constructor(
        public productId?: number,
        public productName?: string,
        public productPrice?: number,
        public productDescription?: string,
        public categoryName?: string,
        public quantity?:number,
        public productImage?: string,
        public totalPice?: number
    ) { }

}
