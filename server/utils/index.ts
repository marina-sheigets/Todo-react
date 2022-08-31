const users: any = [];

export function addUser(id: string, room: any) {
	const user = { id, room };
	users.push(user);
	return user;
}
export const userJoin = (userID: string, room: string) => {
	!users.some((item: any) => item.userID === userID) && users.push({ userID, room });
};

export function getCurrentUser(id: string) {
	return users.find((user: any) => user.userID == id);
}

export const userLeave = (room: string) => {
	const index: any = users.findIndex((user: any) => user.room == room);
	if (index !== -1) {
		return users.splice(index, 1);
	}
};
