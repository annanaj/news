export default function PageNotFound() {
	return (
		<div className="flex h-screen w-screen justify-center bg-[url('./assets/notfound.svg')] bg-cover bg-center bg-no-repeat">
			<div className="mt-[20vh] text-center">
				<h1 className="text-6xl font-semibold">404</h1>
				<p className="text-2xl">We do not have such a page</p>
			</div>
		</div>
	);
}
