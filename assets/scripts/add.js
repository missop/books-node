class Create {
    constructor(el) {
        this.btn = $(el);
    }
    fn() {
        this.btn.click(() => {
            alert(1);
        });
    }
}

export default Create;