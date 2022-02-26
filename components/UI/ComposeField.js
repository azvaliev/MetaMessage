export default function ComposeField(props) {
    return (
        <>
        { props.textarea ?
        <textarea value={props.value}
        onChange={props.onInputChange}
        className="bg-transparent p-2 w-90 outline-none"
        placeholder={props.placeholder}
        rows="2"
        onSelect={props.preventScroll}
        onFocus={props.preventScroll}
        onFocusCapture={props.preventScroll}
        ref={props.ref}
        
        />
        :
        <input type="text" 
            value={props.value} 
            onChange={props.onInputChange}
            className="bg-transparent border-gray-300 rounded-none mx-2 w-full focus:outline-none"
            placeholder={props.placeholder}
            onSelect={props.preventScroll}
            onFocus={props.preventScroll}
            onFocusCapture={props.preventScroll}
            ref={props.ref}
            autoFocus
        />
        }
        </>
    )
}