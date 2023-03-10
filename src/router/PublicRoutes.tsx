interface Props {
  children: JSX.Element;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const PublicRoutes: React.FC<Props> = ({ children }: Props) => {
  return <div>PublicRoutes</div>;
};
