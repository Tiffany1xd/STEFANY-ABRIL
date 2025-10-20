import { Module } from '@nestjs/common';
import { BusModule } from './bus/bus.module';
import { DriverModule } from './driver/driver.module';
import { PassengerModule } from './passenger/passenger.module';
import { RouteModule } from './route/route.module';

@Module({
  imports: [BusModule, DriverModule, PassengerModule, RouteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
