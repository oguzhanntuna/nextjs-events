import { getFeaturedEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export default EventDetailPage;

export const getStaticProps = async ({ params: { eventId } }) => {
  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30 // every 30 seconds
  };
};

export const getStaticPaths = async () => {
  // In order not to overkill, we only pre-generate featured events which are more likely to be visited.
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    // However we have more paths to specify than only the featured events. Therefore, fallback should be set to true to generate the other pages 
    // that are not specifed in paths. Those will not have the content in page source though.
    // fallback: true,

    // Waits until the page is all ready to be displayed on the browser.
    fallback: 'blocking',
  };
};
