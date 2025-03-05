import type { Route } from "./+types/use";
import { type FC, Suspense, use } from "react";

export const loader = async () => {
	// これは待機されないことに注意してください
	const nonCriticalData: Promise<string> = new Promise((res) =>
		setTimeout(() => res("non-critical"), 5000),
	);

	const criticalData: Promise<string> = new Promise((res) =>
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
				<HeavyComponent nonCriticalDataPromise={nonCriticalData} />
			</Suspense>
		</div>
	);
};

export default MyComponent;

const HeavyComponent: FC<{ nonCriticalDataPromise: Promise<string> }> = ({
	nonCriticalDataPromise,
}) => {
	const dataContents = use(nonCriticalDataPromise);

	return <h3>重要でない値: {dataContents}</h3>;
};
