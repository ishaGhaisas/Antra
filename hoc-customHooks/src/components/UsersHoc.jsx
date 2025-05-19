import React from "react";
import withFetch from "../hoc/withFetch";

class UsersHoc extends React.Component {
  render() {
    const { data, error } = this.props;

    if (error) return <p>Error: {error}</p>;
    if (!data) return <p>Loading...</p>;

    return (
      <div>
        <h3>Users (HOC)</h3>
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default withFetch(UsersHoc, "http://localhost:3001/users");
