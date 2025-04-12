import { render } from "@react-email/render";

export default function renderEmailFactory(email: (props: any) => any) {
  return async (props: unknown): Promise<string> => {
    return await render(email(props));
  };
}
