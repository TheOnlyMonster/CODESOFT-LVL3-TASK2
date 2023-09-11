import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Skeleton from "@mui/joy/Skeleton";
import Transition from "../Transition/Transition";
export default function BasicCardSkeleton() {
  return (
    <Transition>
      <Card
        variant="outlined"
        sx={{ width: 250 }}
        style={{ margin: "20px", textAlign: "center" }}
      >
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Skeleton>
            <img
              src="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286"
              srcSet="https://images.unsplash.com/photo-1527549993586-dff825b37782?auto=format&fit=crop&w=286&dpr=2 2x"
              loading="lazy"
              alt=""
            />
          </Skeleton>
        </AspectRatio>
        <CardContent orientation="horizontal">
          <div>
            <Typography level="h3" size="sm">
              <Skeleton>
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </Skeleton>
            </Typography>
            <Typography fontSize="lg" fontWeight="lg">
              <Skeleton>Lorem ipsum dolor</Skeleton>
            </Typography>
          </div>
        </CardContent>
      </Card>
    </Transition>
  );
}
