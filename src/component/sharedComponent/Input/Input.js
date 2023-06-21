
export function Input({ setInputValue, InputValue, placeholder, type}) {
 

    function InputHandler(e) {
        let {value} = e.target
        setInputValue(value)
    }
    return (
        <input type={type ? type : "text"}
            placeholder={placeholder ? placeholder : "type text"}
            onChange={InputHandler}
            value={InputValue} />
    )

}