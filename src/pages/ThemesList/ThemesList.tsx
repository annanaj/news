import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';

import Alert from '../../components/Alert/Alert';
import Button from '../../components/Button/Button';
import Themes from '../../components/Themes/Themes';
import logo from '../../assets/logo.webp';
import { RxCrossCircled } from 'react-icons/rx';

interface User {
	id: number;
	name: string;
}

interface FormValues {
	name: string;
}

export default function ThemesList() {
	const [count, setCount] = useState(0);
	const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
	const [alertVisible, setAlertVisible] = useState(false);

	const themes = [
		'News & Sentiments',
		'Company Overviews',
		'Technical indicators TBA',
	];

	const handleSelectTheme = (theme: string) => {
		setSelectedTheme(theme);
		setAlertVisible(true);
		setCount((prevCount) => prevCount + 1);
	};

	const [userData, setUserData] = useState<User[] | null>(null);
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormValues>({ mode: 'onChange' });

	useEffect(() => {
		fetch('http://localhost:3001/users')
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				setUserData(data);
			});
	}, []);

	const handleAddUser = (formData: FormValues) => {
		fetch('http://localhost:3001/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ name: formData.name }),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((newUser) => {
				setUserData((prevUsers) =>
					prevUsers ? [...prevUsers, newUser] : [newUser]
				);
				reset();
			})
			.catch((error) => {
				console.error('Error adding user:', error);
			});
	};

	const handleDeleteUser = (userId: number) => {
		fetch(`http://localhost:3001/users/${userId}`, {
			method: 'DELETE',
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				setUserData((prevUsers) =>
					prevUsers
						? prevUsers.filter((user) => user.id !== userId)
						: null
				);
			})
			.catch((error) => {
				console.error('Error deleting user:', error);
			});
	};

	return (
		<div className="container mx-auto mt-28 flex max-w-screen-sm flex-col items-center gap-y-4 px-10">
			<div>
				<img src={logo} className="h-40 text-center" alt="logo" />
			</div>

			{userData && (
				<div className="container mx-auto mb-24 flex max-w-[400px] flex-col gap-4">
					<motion.h1
						className="mx-auto p-4 text-gray-800"
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 1.5 }}
					>
						Users List
					</motion.h1>
					<div className="flex flex-col">
						{userData.map((user) => (
							<div
								key={`${user.id}-${user.name}`}
								className="grid grid-cols-2 gap-4 border-b-[1px]"
							>
								<div className="flex place-items-center pl-2">
									{user.name}
								</div>
								<Button
									type="submit"
									onClick={() => handleDeleteUser(user.id)}
									variant="transparent"
								>
									<RxCrossCircled size={24} />
									Delete
								</Button>
							</div>
						))}
					</div>
					<form
						onSubmit={handleSubmit(handleAddUser)}
						className="flex flex-1 flex-col"
					>
						<div className="grid grid-cols-2 gap-4">
							<input
								type="text"
								placeholder="User name"
								{...register('name', {
									required: 'Name is required',
									minLength: {
										value: 3,
										message:
											'Name must be at least 3 characters long',
									},
								})}
								className="rounded-md border border-gray-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
							<Button type="submit" variant="blue">
								Add new user
							</Button>
						</div>
						{errors.name && (
							<small className="text-red-500">
								{errors.name.message}
							</small>
						)}
					</form>
				</div>
			)}

			<motion.h1
				className="p-4 text-indigo-600"
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 1.5 }}
			>
				Themes
			</motion.h1>

			<Themes themes={themes} onSelectTheme={handleSelectTheme} />

			{alertVisible && (
				<Alert onClose={() => setAlertVisible(false)}>
					<span>You picked {selectedTheme}</span>
				</Alert>
			)}
		</div>
	);
}
