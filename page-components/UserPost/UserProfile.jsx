export default function UserProfile({ user }) {
  return (
    <div className="grid justify-items-center bg-red-500 w-80 h-80 justify-self-center">
      <div>{user.username}</div>
    </div>
  );
}
