import { getAllEvents, getEventById } from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

const EventDetailPage = (props) => {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
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
}

export default EventDetailPage;

export const getStaticProps = async ({ params: { eventId } }) => {
  const event = await getEventById(eventId);

  return { props: { selectedEvent: event } };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return { 
    paths,
    fallback: false
  };
};
