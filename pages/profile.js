import { useAuth } from '../utils/context/authContext';
import User from '../components/user';

export default function Profile() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Profile Page</h1>
      {user && <User user={user} />}
    </div>
  );
}
