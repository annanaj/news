export default function PageNotFound() {
	return (
		<div className="flex justify-center w-screen h-screen bg-cover bg-center bg-no-repeat bg-[url('./assets/notfound.svg')]">
			<div className="mt-[20vh] text-center">
				<h1 className="text-6xl font-semibold">404</h1>
				<p className="text-2xl">We do not have such a page</p>
			</div>
		</div>
	);
}
