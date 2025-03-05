import { Await } from "react-router";
import type { Route } from "./+types/streaming";
import { type FC, Suspense } from "react";

export const loader = async ({}: Route.LoaderArgs) => {
	// これは待機されないことに注意してください
	const nonCriticalData = new Promise((res) =>
		setTimeout(() => res("non-critical"), 5000),
	);

	const criticalData = await new Promise((res) =>
		setTimeout(() => res("critical"), 300),
	);

	return { nonCriticalData, criticalData };
};

const MyComponent: FC<Route.ComponentProps> = ({ loaderData }) => {
	const { criticalData, nonCriticalData } = loaderData;

	return (
		<div>
			<h1>ストリーミングの例</h1>
			<h2>重要なデータの値: {criticalData}</h2>

			<Suspense fallback={<div>読み込み中...</div>}>
				<Await resolve={nonCriticalData}>
					{(value) => <h3>重要でない値: {value}</h3>}
				</Await>
			</Suspense>
		</div>
	);
};

export default MyComponent;
