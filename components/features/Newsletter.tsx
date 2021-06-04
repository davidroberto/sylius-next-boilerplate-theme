import MailchimpSubscribe, { EmailFormFields } from "react-mailchimp-subscribe";
import SimpleForm from './SimpleForm';

interface IProps {
  mailchimpUrl: string
}  

const Newsletter: React.FC<IProps> = ({ mailchimpUrl }) => (
  <MailchimpSubscribe
    url={mailchimpUrl}
    render={(
        { subscribe, status, message }
    ) => (
       <>
          <h3 >Subscribe to the newsletter: </h3>
            <SimpleForm 
                status={status}
                message={message}
                onSubmitted={(formData: EmailFormFields) => subscribe(formData)} 
            />
      </>
    )}
  />
)

export default Newsletter;