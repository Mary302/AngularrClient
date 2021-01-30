export class SuccessfulLoginResponse {
    public constructor(
        public token?: string,
        public cartId?: number,
        public userType?: string,
        public name?: string,
        public city?: string,
        public adsress?: string,
        public isCheckedOut?: boolean,
        
    ) { }

}
