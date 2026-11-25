interface OfferPriceProps {
  standardPrice: number | readonly [number, number];
  offerPrice: number | readonly [number, number];
  startingFrom?: boolean;
  compact?: boolean;
  light?: boolean;
}

type PriceAmount = number | readonly [number, number];

export const OfferPrice = ({
  standardPrice,
  offerPrice,
  startingFrom = false,
  compact = false,
  light = false,
}: OfferPriceProps) => {
  const formatPrice = (price: PriceAmount) =>
    typeof price === 'number'
      ? price.toLocaleString('en-IN')
      : `${price[0].toLocaleString('en-IN')}–₹${price[1].toLocaleString('en-IN')}`;
  const savings: PriceAmount =
    typeof standardPrice === 'number' && typeof offerPrice === 'number'
      ? standardPrice - offerPrice
      : typeof standardPrice !== 'number' && typeof offerPrice !== 'number'
        ? ([standardPrice[0] - offerPrice[0], standardPrice[1] - offerPrice[1]] as const)
        : 0;
  const textColor = light ? 'text-white/55' : 'text-[#78716C]';

  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5 tabular-nums ${compact ? 'text-[11px]' : 'text-sm'}`}>
      <span className={`${textColor} line-through`}>
        ₹{formatPrice(standardPrice)}
      </span>
      <span className={`font-extrabold text-[#D9541E] ${compact ? '' : 'text-base'}`}>
        {startingFrom ? 'Starting from ' : ''}
        ₹{formatPrice(offerPrice)}
      </span>
      <span className={`font-semibold ${light ? 'text-[#F06B37]' : 'text-[#D9541E]'}`}>
        Save ₹{formatPrice(savings)}
      </span>
    </span>
  );
};
