class Create {
    constructor(el) {
        this.btn = $(el);
    }
    fn() {
        this.btn.click(yd.throttle(() => {
            fetch('添加书籍!');
        }, 500));
    }
}

export default Create;