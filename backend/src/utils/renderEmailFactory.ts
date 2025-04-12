import { render } from "@react-email/render";

export default function renderEmailFactory<T>(
  email: (props: T) => React.ReactElement
) {
  return async (props: T): Promise<string> => {
    return await render(email(props));
  };
}
