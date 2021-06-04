import { EmailFormFields } from "react-mailchimp-subscribe";

interface IProps {
    status: string | null,
    message: string | Error | null,
    onSubmitted: (data: EmailFormFields) => void
} 

const SimpleForm: React.FC<IProps> = ({ status, message, onSubmitted }) => {
  let input: HTMLInputElement | null;

  const submit = () => {
      input &&
      input.value.indexOf("@") > -1 &&
      onSubmitted({
        EMAIL: input.value
      });
  }
    
  return (
    <form >
      
        <input
          ref={node => (input = node)}
          type="email"
          placeholder="Your email"
        />
        
        <button type="button" onClick={submit}>Register</button>
      
      <div>
        {status === "sending" && 
          <div>In progress...</div>
        }
        {status === "error" && (
          <div
            dangerouslySetInnerHTML={{ __html: "We cannot register your email" as string}}
          />
        )}
        {status === "success" && (
          <div
            dangerouslySetInnerHTML={{ __html: "You have been registered!"as string}}
          />
        )}
      </div>
    </form>
  );
};

export default SimpleForm;