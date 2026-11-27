// Synthetic examples only. No internal measurements or current provider prices.
const cost = ({ uncached, cached = 0, output }) =>
	(uncached * 2 + cached * 0.5 + output * 8) / 1_000_000;
const baseline = cost({ uncached: 6000, output: 500 });
const scenarios = {
	noInputReuse: baseline,
	stablePrefixReused: cost({ uncached: 2000, cached: 4000, output: 500 }),
	shorterInputReuseLost: cost({ uncached: 4000, output: 500 }),
};
const small = 0.003,
	large = 0.02,
	routing = 0.001,
	escalationFraction = 0.3;
console.log(
	JSON.stringify(
		{
			label: "Synthetic arithmetic, not Tokenomics benchmark data",
			scenarios,
			eightCallWorkflow: baseline * 8,
			tenThousandEightCallWorkflows: baseline * 8 * 10_000,
			routing: {
				escalationBoundary: 1 - (routing + small) / large,
				expectedCost: routing + small + escalationFraction * large,
			},
			latency: { optimizerMs: 35, downstreamSavedMs: 20, netAddedMs: 35 - 20 },
		},
		null,
		2,
	),
);
