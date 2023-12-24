const CauseError = () => (
	// @ts-expect-error This is intentional to test the error boundary component works.
	goodbye_cruel_world()
);

export default CauseError;
