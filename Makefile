GENERATED_FILES = \
	timezones.json

.PHONY: all clean

all: $(GENERATED_FILES)

clean:
	rm -rf -- $(GENERATED_FILES) build

build/tz_world_mp.zip:
	mkdir -p $(dir $@)
	curl -o $@ 'http://efele.net/maps/tz/world/tz_world_mp.zip'

build/tz_world_mp.shp: build/tz_world_mp.zip
	rm -rf -- $(basename $@)
	mkdir -p $(basename $@)
	unzip -d $(basename $@) $<
	for file in `find $(basename $@) -type f`; do chmod 644 $$file; mv $$file $(basename $@).$${file##*.}; done
	rm -rf -- $(basename $@)
	touch $@

timezones.json: build/tz_world_mp.shp
	node_modules/.bin/topojson -o $@ --projection='d3.geo.mercator().scale(960 / 2 / Math.PI).translate([960 / 2, 960 / 2]).precision(.1)' --simplify=1 -q 1e5 --id-property=TZID -- timezones=$<