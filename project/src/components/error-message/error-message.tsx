import { useAppSelector } from '../../hooks';
import './error-message.css';

export const ErrorMessage: React.FunctionComponent = () => {
  const { error } = useAppSelector((state) => state);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

};
