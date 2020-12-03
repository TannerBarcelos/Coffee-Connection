import React, { useState, useEffect } from 'react';
import moment from 'moment';
import UserDashboardItem from './UserDashboardItem';

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    (async function getUsers() {
      const userRes = await fetch(
        'https://coffee-connection.herokuapp.com/user/users',
      );
      const res = await userRes.json();
      setUsers(res.users);
    })();
  }, []);

  return users ? (
    <>
      <h1 style={{ marginTop: '5rem', textAlign: 'center' }}>
        Analytics Dashboard
      </h1>
      <div className="ui raised very padded text container segment">
        {users &&
          users.map((user) => {
            // convert to a nice format using moment
            const date = moment(
              user.date.slice(0, 10).split('-').join(''),
              'YYYYMMDD',
            ).format('MMM Do YYYY');
            return (
              <UserDashboardItem
                usersName={user.name}
                usersJoinDate={date}
                usersEmail={user.email}
                key={user.id}
              />
            );
          })}
      </div>
    </>
  ) : null;
};

export default Dashboard;
