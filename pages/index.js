import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage({ featuredEvents }) {

  return (
    <>
      <EventList items={featuredEvents} />
    </>
  );
}

export default HomePage;

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents,
    },
  };
};
