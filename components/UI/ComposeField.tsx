interface Props {
  textarea: boolean;
  onInputChange: any;
  placeholder: string;
  value: string;
}

export default function ComposeField(props: Props) {
  return (
    <>
      {props.textarea ? (
        <textarea
          value={props.value}
          onChange={props.onInputChange}
          className="bg-transparent p-2 w-86 outline-none text-white"
          placeholder={props.placeholder}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={props.value}
          onChange={props.onInputChange}
          className="bg-transparent border-gray-300 rounded-none mx-2 w-full focus:outline-none"
          placeholder={props.placeholder}
          autoFocus
        />
      )}
    </>
  );
}

