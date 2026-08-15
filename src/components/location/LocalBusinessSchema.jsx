// FR-7.4: Schema.org LocalBusiness structured data for local search / Google Maps visibility.
// Google accepts JSON-LD anywhere in the DOM — doesn't need to be in <head>.
export default function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    name: 'Forge Athletics',
    image: 'https://forgeathletics.com/og-image.jpg',
    '@id': 'https://forgeathletics.com',
    url: 'https://forgeathletics.com',
    telephone: '+1-512-555-0199',
    email: 'hello@forgeathletics.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '842 Ironworks Way, Suite 100',
      addressLocality: 'Austin',
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '05:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '07:00',
        closes: '12:00',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
