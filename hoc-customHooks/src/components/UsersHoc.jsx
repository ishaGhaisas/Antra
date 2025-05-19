import withFetch from "../hoc/withFetch";

const UsersHoc = ({ data, error }) => {
  if (error) return <p>Error: {error}</p>;
  if (!data) return <p>Loading...</p>;

  return (
    <div>
      <h3>Users (HOC)</h3>
      <ul>
        {data.map(user => <li key={user.id}>{user.name}</li>)}
      </ul>
    </div>
  );
};

export default withFetch(UsersHoc, "http://localhost:3001/users");
